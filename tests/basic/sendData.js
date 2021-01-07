import { 
    generateFullName, // user table
    generatePassword,
    generateEmail,
    generateIpAddress, // token table
    generateTitle, // data set table
    generateDataType,
    generateDescription, 
    generateEmailTokenValue, // email confirmation table
    generateDataValue, // data table
} from './generateData.js';
import axios from 'axios'

const axiosControl = async () => {
    console.log('axios test run\n')
}

var usernameRandom = 'alihan'
var passwordRandom = 'password'
var newPasswordRandom = 'newpassword'
var emailRandom = 'email@email.com'
var nameRandom = 'this.name'
var tokenRandom = 'randToken'
var titleRandom = 'randTitle'
var dataTypeRandom = 'randType'
var descriptionRandom = 'randDesc'

const signUpTest = () => {

    usernameRandom = generateFullName()
    passwordRandom = 'randPassword'
    emailRandom = 'email@email.com'
    nameRandom = 'this.name'

    console.log('user test run\n')//uye olma
    axios.post('http://localhost:4000/authentications/register/', {
        username: usernameRandom,
        password: passwordRandom,
        email: emailRandom,
        name: nameRandom
    })
        .then((respose) => {
            console.log(respose.data)
        })
        .catch((err) => {
            console.log(err)
        })
        //uye olma sonu
}


const loginTest = () => {
    axios
        .post('http://localhost:4000/authentications/login/', {
          username: this.username,
          password: this.password
        })
        .then((respose) => {
          if (respose.status === 200) {
            tokenRandom = respose.data.token.token_value
            console.log('login succesfull')
          }
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data)
          if (err.response.data.error !== undefined) {
            console.log('Validation Failed')
          }
        })
}

const profileViewTest = () => {
    axios
      .get('/authentications/me/', {
        headers: {
          'X-AccessToken': tokenRandom
        }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.username)
          console.log(response.data.name)
          console.log(response.data.email)
          console.log(moment(String(response.data.createdAt)).format('DD/MM/YYYY'))
          console.log(oment(String(response.data.updatedAt)).format('DD/MM/YYYY'))
        }
      })
}
const changeUserNameTest = () => {
    usernameRandom = generateFullName()
    axios
        .patch(
          '/authentications/me/',
          {
            password: passwordRandom,
            newUsername: usernameRandom
          },
          {
            headers: {
              'X-AccessToken': tokenRandom,
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log('username change successfull')
          }
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 400) {
            console.log(err.response.data.message)
          }
        })
}

const changePasswordTest = () => {
    newPasswordRandom = generatePassword()
    axios
    .patch(
      '/authentications/me/',
      {
        password: passwordRandom,
        newPassword: newPasswordRandom
      },
      {
        headers: {
          'X-AccessToken': tokenRandom,
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log('Your password has been successfully changed.')
      }
    })
    .catch((err) => {
      if (err.response.status === 401 || err.response.status === 400) {
        console.log(err.response.data.message)
      }
    })
    passwordRandom = newPasswordRandom
}


const getDataSetsTest = () => {
    axios.get('http://localhost:4000/data-sets/', {
        headers: {
          'X-AccessToken': tokenRandom
        }
      }).then((response) => {
        console.log(response.data.results)
      })
}

const createDatasetTest = () => {
    titleRandom=generateTitle()
    dataTypeRandom='randomDataType'
    descriptionRandom = 'randomDesc'

    axios.post(
        'http://localhost:4000/data-sets/',
        {
          title: this.app.title,
          data_type: this.app.data_type,
          description: this.app.description
        },
        {
          headers: {
            'X-AccessToken': localStorage.getItem('X-AccessToken')
          }
        }
      )
        .then((response) => {
          swal({
            title: 'Success',
            text: 'Created successfully!',
            icon: 'success'
          }).then((result) => {
            this.$router.push('/api-dashboard-vmc')
          })
        })
        .catch(function (error) {
          swal({
            title: 'Error',
            text: error.response.data.error.details[0].message,
            icon: 'error'
          })
        })
}

export const test = () => {
    axiosControl()
    for(var i=0;i<10;i++){
        signUpTest()
        loginTest()
        for(var j=0;j<10;i++){
            profileViewTest()
            changeUserNameTest()
            changePasswordTest()
            getDataSetsTest()


        }
    }
}
export default {
    test
}