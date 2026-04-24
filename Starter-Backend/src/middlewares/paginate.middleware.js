module.exports = (Model) => async (req, res, next) => {
    try {
        // ======================
        // 📌 Pagination
        // ======================
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 5, 1);
        const skip = (page - 1) * limit;

        // ======================
        // 📌 Sorting
        // ======================
        const sortBy = req.query.sort || 'createdAt';
        const order = req.query.order === 'desc' ? -1 : 1;

        // ======================
        // 📌 Filtering (Dynamic + Safe)
        // ======================
        const excludedFields = ['page', 'limit', 'sort', 'order', 'select'];

        // 🔒 whitelist للفيلتر
        const allowedFilters = ['email', 'username', 'action', 'user' , 'role' , 'isActive', 'createdAt' , 'updatedAt']; // عدل حسب الحقول المتاحة في الموديل

        let filter = {};

        Object.keys(req.query).forEach(key => {
            if (
                !excludedFields.includes(key) &&
                allowedFilters.includes(key)
            ) {
                if (key === 'isActive') {
                    filter[key] = req.query[key] === 'true';
                } else {
                    filter[key] = req.query[key];
                }
            }
        });

        // ======================
        // 📌 Select (Projection)
        // ======================
        const forbiddenFields = ['password', '__v'];
        let select = '';

        if (req.query.select) {
            const fields = req.query.select
                .split(',')
                .map(f => f.trim()); // إزالة المسافات

            const safeFields = fields.filter(
                field => !forbiddenFields.includes(field)
            );

            select = safeFields.join(' ');
        }

        // ======================
        // 📌 Query Execution
        // ======================
        const [result, total] = await Promise.all([
            Model.find(filter)
                .select(select || '-password') // 🔒 حماية أساسية
                .sort({ [sortBy]: order })
                .skip(skip)
                .limit(limit),

            Model.countDocuments(filter)
        ]);

        // ======================
        // 📌 Response
        // ======================
        res.paginatedResult = {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalResults: total,
            resultsCount: result.length,
            result
        };

        next();

    } catch (err) {
        next(err);
    }
};