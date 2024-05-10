import mongoose, { Schema } from 'mongoose';
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    ethToken: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    acceptedOrders: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
//# sourceMappingURL=user.js.map