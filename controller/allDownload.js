const DownloadedFile = require('../models/DownloadedFile')
const User = require('../models/User')

const gellAllFiles = async (req, res, next) => {
    try {
        if (req.user.isPremiumUser) {
            const allDownloads=await DownloadedFile.findAll({where:{userId:req.user.id}});
            console.log("all downloads====>>>",allDownloads[0]);
            res.status(200).json(allDownloads);
        }
    }
    catch (err) {
    }
}

module.exports = {
    gellAllFiles
}