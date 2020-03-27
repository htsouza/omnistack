const connection = require('../database/connection');

module.exports = {

    // Listar todas as ongs
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            // Paginação para retornar de 5 em 5 itens.
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

            // Envia para o cabeçalho do response o total de itens retornado.
            response.header('X-Total-Count', count['count(*)']);
    
        return response.json(incidents);
    },

    // Criar uma ONG
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
    
        return response.json({ id });
    },

    // Deletar um Incident (Caso)
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident) {
            return response.status(404).json({ error: 'Incident do not exist for ONG.' });           
        }

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });           
        }

        await connection('incidents').where('id', id).delete();

        // Retornar uma responsta que não tem conteúdo.
        return response.status(204).send();        
    }
};