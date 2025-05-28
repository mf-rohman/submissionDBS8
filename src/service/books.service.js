import joi from 'joi';

const bookSchema = joi.object({
    name: joi.string().min(3).required(),
    year: joi.number().integer().min(1450).max(new Date().getFullYear()).required(),
    author: joi.string().min(3).max(100).required(),
    summary: joi.string().min(3).max(100).required(),
    publisher: joi.string().min(3).max(100).required(),
    pageCount: joi.number().integer().min(1).required(),
    readPage: joi.number().integer().required().min(1).max(joi.ref('pageCount')),
    reading: joi.boolean().required(),
});

const validateBook = (payload) => {
    const { error } = bookSchema.validate(payload);
    if (error) {
        throw new Error(`Validation error: ${error.message}`);
    }
    if (payload.readPage > payload.pageCount) {
        throw new Error('Read page cannot be greater than total page count');
    }
}

export {validateBook};