import * as services from '../services'

export const getAllPost = async (req, res) => {
    try {
        const response = await services.getAllPost();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Iternal Server Error'
        })
    }
}
