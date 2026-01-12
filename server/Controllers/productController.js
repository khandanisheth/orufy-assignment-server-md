import Product from "../models/Product.js";

const createProduct = async (req, res) => {
    try {
        const images = req.files.map((f) => f.filename);

        const body = {
            ...req.body,
            images,
        };

        const product = await Product.create(body);

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error("PRODUCT CREATE ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAll = async (_req, res) => {
    const list = await Product.find();
    res.json({ success: true, list });
};

const updateProduct = async (req, res) => {
    try {
        let imgs = req.body.oldImages ? JSON.parse(req.body.oldImages) : [];

        if (req.files && req.files.length > 0) {
            const newImgs = req.files.map((f) => f.filename);
            imgs = [...imgs, ...newImgs];
        }

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, images: imgs },
            { new: true }
        );

        res.json({ success: true, updated });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};

const togglePublish = async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.published = !product.published;
    await product.save();
    res.json({ success: true, published: product.published });
};

export default {
    createProduct,
    getAll,
    togglePublish,
    deleteProduct,
    updateProduct,
};
