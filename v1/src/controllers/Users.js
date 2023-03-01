import UserService from '../services/Users.js';
import httpStatus from 'http-status';
import Helper from '../scripts/utils/helper.js';
import messages from '../scripts/utils/messages.js';
import ProjectService from '../services/Projects.js';
import eventEmitter from '../scripts/events/eventEmitter.js';
import { fileURLToPath } from 'url';
import path from 'path';
import ApiError from '../errors/ApiError.js';
import ApiNotFoundError from '../errors/ApiNotFoundError.js';

const __filename = fileURLToPath(import.meta.url);//get all name
const __dirname = path.dirname(__filename); //get dir name from it.

class UsersController {
    async create(req, res, next) {
        req.body.password = Helper.passwordToHash(req.body.password);
        try {
            const result = await UserService.add(req.body);
            //TODO: do not return password.
            res.status(httpStatus.CREATED).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode))
        }
    }

    async list(req, res, next) {
        try {
            const result = await UserService.findAll();
            res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode))
        }
    }

    async login(req, res, next) {
        try {
            let user = await UserService.loginUser(req.body.email);
            if (!user)
                return next(new ApiNotFoundError());
            const hashedPassword = Helper.passwordToHash(req.body.password);
            if (hashedPassword.toString() !== user.password)
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send({ message: messages.ERROR.WRONG_CREDENTIAL });
            //TIP: How to use refresh an access token when login.
            user = {
                ...user.toObject(),
                tokens: {
                    acces_token: Helper.createAccessToken(user),
                    refresh_token: Helper.createRefreshToken(user),
                },
            };
            delete user.password; //TIP: do not return password.
            return res.status(httpStatus.OK).send(user);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    /**
     *
     * @returns Projects with the user id that sent the request.
     */
    async projectList(req, res, next) {
        req.user?.id;
        try {
            const projects = await ProjectService.findAll({
                user_id: req.user?._id,
            });
            res.status(httpStatus.OK).send(projects);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async resetPassword(req, res, next) {
        try {
            const newPassword = Helper.createPassword();
            const updatedUser = await UserService.update(
                { email: req.body.email },
                { password: Helper.passwordToHash(newPassword) }
            );
            eventEmitter.emit('send_email', {
                to: updatedUser.email, // list of receivers
                subject: 'Sifre sifirlama', // Subject line
                html: `Talebiniz uzere sifre sifirlama isleminiz gereceklesmistir.</br>Giris yaptiktan sonra sifreinizi degistirmeyi unutmayin.</br>Yeni Sifreniz:${newPassword}`, // html body
            });
            res.status(httpStatus.OK).send({
                message:
                    'Sifre sifirlama islemi icin sisteme kayitli e-posta adresinize gereken bilgileri gonderdik.',
            });
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async changePassword(req,res, next){
        //TODO: UI'dan sonra eski-yeni sifre karsilastirmasi eklenmeli.
        req.body.password = Helper.passwordToHash(req.body?.password);
        try {
           const updatedUser = await UserService.update({_id:req.user?._id}, req.body);
           res.status(httpStatus.OK).send(updatedUser);   
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async update(req, res, next) {
        // if(req.body?.password) delete req.body.password; //TIP: We don't want client to include password data to update.
        //or we can do it with reduce.
        const updateData = Object.keys(req.body).reduce(
            (objectToReturn, key) => {
                if (key !== 'password') {
                    objectToReturn[key] = req.body[key];
                }
                return objectToReturn;
            },
            {}
        );
        try {
            const updatedUser = await UserService.update(
                { _id: req.user?._id },
                updateData
            );
            res.status(httpStatus.OK).send(updatedUser);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }
    
    updateProfileImage(req,res, next){
        const extensionName = path.extname(req.files.profile_image.name);
        const fileName = req.user?._id+`${extensionName}`;
        const folderPath = path.join(__dirname, "../","uploads/users", fileName);

        if(!req?.files?.profile_image){
            return next(new ApiError('You need to upload an image to change your profile picture.', httpStatus.BAD_REQUEST));
        }
        req.files.profile_image.mv(folderPath, async function(error){
            if(error) return next(new ApiError(error?.message, error?.statusCode));
            //TIP:Save to db.
            try {
                const updatedUser = await UserService.update({_id:req.user._id}, {profile_image:fileName});                
                return res.status(httpStatus.OK).send({message:'Profil fotografi basariyla degistirldi', user:updatedUser});
            } catch (error) {
                return next(new ApiError('Profil fotografi dbye kaydedilirken bir hata ile karsilasildi'));
            }
        });
        //mv fotografin kendisinden geliyor, fotoyu bununla baska bir yere tasiyabiliriz.
        /**
         * 1.resim kontrolu
         * 2.upload islemi
         * 3.db save islemi
         * 4.response islemi
         */
        
    }

    async remove(req,res, next){
        try {
            const deletedUser = await UserService.delete(req.params?.id);
            if(!deletedUser) return res.status(httpStatus.NOT_FOUND).send({error:'Boyle bir kayit bulunmamaktadir.'});
            console.log("deletedUser:",deletedUser);
            res.status(httpStatus.OK).send({message:'User basariyla silindi'});
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error:'User silinirken bir hata olustu.'});
        }
    }
}

export default new UsersController();
