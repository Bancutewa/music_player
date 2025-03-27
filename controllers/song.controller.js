const Song = require("../models/song.model")
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const cloudinary = require('cloudinary').v2;




const getAllSongs = asyncHandler(async (req, res) => {
    // Sao chép query từ req.query
    const queries = { ...req.query };

    // Loại bỏ các trường không dùng để lọc
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((field) => delete queries[field]);

    // Chuyển đổi các toán tử so sánh (gte, gt, lt, lte) thành cú pháp MongoDB
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const queryObject = JSON.parse(queryString); // Parse thành object

    // Tạo truy vấn cơ bản
    let queryCommand = Song.find(queryObject);

    // Sắp xếp (sort)
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort('-createdAt'); // Mặc định sắp xếp theo ngày tạo giảm dần
    }

    // Chọn trường (fields)
    if (req.query.fields) {
        const fields = req.query.fields.split(',').map((field) => field.trim());
        queryCommand = queryCommand.select(fields);
    }

    // Phân trang (pagination)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Đảm bảo page và limit không âm
    if (page < 1 || limit < 1) {
        return res.status(400).json({
            success: false,
            message: 'Page and limit must be positive numbers',
        });
    }

    queryCommand = queryCommand.skip(skip).limit(limit);

    // Thực thi truy vấn
    try {
        const songs = await queryCommand.exec(); // Thực thi truy vấn
        const counts = await Song.countDocuments(queryObject); // Đếm tổng số document

        res.status(200).json({
            success: songs.length > 0, // Chỉ thành công nếu có dữ liệu
            total: songs.length, // Số lượng bản ghi trong trang hiện tại
            counts, // Tổng số bản ghi khớp với query
            data: songs.length > 0 ? songs : 'No songs found',
        });
    } catch (err) {
        console.error("Song query error:", err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: err.message,
        });
    }
});

const createAndUploadSong = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");
    if (!req.files || !req.files.song) throw new Error("Missing song file");

    const slug = slugify(req.body.title, { lower: true, strict: true });
    req.body.slugify = slug;

    req.body.url = req.files.song[0].path;

    if (req.files.cover) {
        req.body.coverImage = req.files.cover[0].path;
    }

    // Tạo document Song
    const newSong = await Song.create(req.body);

    return res.status(201).json({
        success: newSong ? true : false,
        data: newSong ? newSong : 'Cannot create and upload Song',
    });
});


const uploadMusic = asyncHandler(async (req, res) => {
    const { sid } = req.params;
    console.log(sid);

    if (!req.file) throw new Error("Missing file");
    const song = await Song.findById(sid);
    const fileUrl = req.file.path;
    const response = await Song.findByIdAndUpdate(sid, { url: fileUrl }, { new: true });

    return res.status(200).json({
        status: response ? true : false,
        updatedSong: response ? response : 'Cannot update song file'
    });
}); ``

const getSong = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const song = await Song.findById(sid)
    return res.status(200).json({
        success: song ? true : false,
        data: song ? song : 'Cannot get Song'
    })
})
const updateSong = asyncHandler(async (req, res) => {
    const { sid } = req.params;
    if (Object.keys(req.body).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
        throw new Error("Missing input");
    }
    if (req.body.title) {
        req.body.slugify = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.files && req.files.song) {
        req.body.url = req.files.song[0].path;
    }
    if (req.files && req.files.cover) {
        req.body.coverImage = req.files.cover[0].path;
    }

    const updatedSong = await Song.findByIdAndUpdate(sid, req.body, { new: true });
    return res.status(200).json({
        success: updatedSong ? true : false,
        data: updatedSong ? updatedSong : 'Cannot update Song',
    });
});

const deleteSong = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const deletedSong = await Song.findByIdAndDelete(sid)
    return res.status(200).json({
        success: deletedSong ? true : false,
        data: deletedSong ? deletedSong : 'Cannot delete Song'
    })
})




module.exports = {
    getAllSongs,
    getSong,
    createAndUploadSong,
    updateSong,
    deleteSong,
    uploadMusic
}
