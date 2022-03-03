import permission from './permission'
const install = (app) => {
    app.directive('permission', permission)
}
export default install