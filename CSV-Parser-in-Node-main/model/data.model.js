
module.exports = (sequelize, Sequelize) => {
    const csvdata = sequelize.define("csvdata", {
      User_Id: {
        type: Sequelize.STRING
      },
      FirstName: {
        type: Sequelize.STRING
      },
      Last_Name: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Date_of_birth: {
        type: Sequelize.STRING
      },
      Job_Title: {
        type: Sequelize.STRING
      }
    });
  
    return csvdata;
  };