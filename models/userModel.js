export default (sequelize, DataTypes) => {
   const User = sequelize.define( "users", {
       id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true
       },
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },
       email: { 
           type: DataTypes.STRING,
           unique: true,
           isEmail: true, //checks for email format
           allowNull: false
       },
       active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
       },
       password: {
           type: DataTypes.STRING,
           allowNull: false
       },
   }, {timestamps: true}, )
   return User
}