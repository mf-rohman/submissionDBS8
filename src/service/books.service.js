import Joi from 'joi';

const getBookSchema = (method = 'POST') => {
    const action = method === 'PUT' ? 'memperbarui' : 'menambahkan';

    return Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.empty": `Gagal ${action} buku. Mohon isi nama buku`,
            "any.required": `Gagal ${action} buku. Mohon isi nama buku`,
            "string.min": `Gagal ${action} buku. Mohon isi nama buku minimal 3 karakter`
        }),
        year: Joi.number().integer().min(1450).max(new Date().getFullYear()).required(),
        author: Joi.string().min(3).max(100).required(),
        summary: Joi.string().min(3).required(),
        publisher: Joi.string().min(3).required(),
        pageCount: Joi.number().integer().min(1).required(),
        readPage: Joi.number().integer().min(0).max(Joi.ref('pageCount')).required().messages({
            "number.max": `Gagal ${action} buku. readPage tidak boleh lebih besar dari pageCount`,
            "any.required": `Gagal ${action} buku. Mohon isi readPage`
        }),
        reading: Joi.boolean().required()
    });
};

const validateBook = (payload, method = 'POST') => {
    const schema = getBookSchema(method);
    const { error } = schema.validate(payload, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        throw new Error(errorMessage);
    }

    if (payload.readPage > payload.pageCount) {
        const action = method === 'PUT' ? 'memperbarui' : 'menambahkan';
        throw new Error(`Gagal ${action} buku. readPage tidak boleh lebih besar dari pageCount`);
    }
};

export { validateBook };