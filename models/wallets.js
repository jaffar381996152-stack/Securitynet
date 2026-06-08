const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletsSchema = new Schema(
    {
        wallet_private_key: {
            type: String,
        },
        wallet_address: {
            type: String,
        },
        status: {
            type: String,
        },
        user_wallet_address: {
            type: String,
        },
        increase_value: {
            type: Number,
        },
        name: {
            type: String,
        },
        value: {
            type: String,
        },
        paid_amount: {
            type: String,
        },
        lock: {
            type: Boolean,
        },
        email: {
            type: String,
        }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.models.Wallets || mongoose.model('Wallets', WalletsSchema);
