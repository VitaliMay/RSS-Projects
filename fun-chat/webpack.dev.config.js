const path = require('path');

// module.exports = {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     devServer: {
//         static: path.resolve(__dirname, './dist'),
//     },
// };

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        historyApiFallback: true, // Позволяет использовать HTML5 History API
    },
};
