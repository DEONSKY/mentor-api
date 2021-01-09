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
import { response } from 'express';

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
var datasetIdRandom = 0

var signUpSuccess =0
var signUpFailed = 0
const signUpTest = async() => {

    usernameRandom = generatePassword()
    passwordRandom = generatePassword()
    emailRandom = generateEmail()
    nameRandom = generateFullName()
    /*
    console.log(usernameRandom)
    console.log(passwordRandom)
    console.log(emailRandom)
    console.log(nameRandom)*/
    console.log('\nsign up')//uye olma
    await axios.post('http://localhost:4000/authentications/register/', {
        username: usernameRandom,
        password: passwordRandom,
        email: emailRandom,
        name: nameRandom
    })
        .then((respose) => {
          if (respose.status === 201){
            console.log('success')
            console.log(response.data)
            signUpSuccess++
          }
        })
        .catch((err) => {
            console.log('error')
            console.log(err.response.config.data)
            signUpFailed++
        })
        //uye olma sonu
}


const loginTest = async() => {

    console.log('\nlogin')//uye olma
    await axios
        .post('http://localhost:4000/authentications/login/', {
          username: usernameRandom,
          password: passwordRandom
        })
        .then((respose) => {
          if (respose.status === 200) {
            tokenRandom = respose.data.token.token_value
            console.log('login succesfull')
          }
        })
        .catch((err) => {
          //console.log(err.response.data)
          if (err.response.data.error !== undefined) {
            console.log('Validation Failed')
          }
        })
}

const profileViewTest = async() => {
    await axios
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
const changeUserNameTest = async() => {
    usernameRandom = generateFullName()
    await axios
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

const changePasswordTest = async() => {
    newPasswordRandom = generatePassword()
    await axios
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


const getDataSetsTest = async() => {
    await axios.get('http://localhost:4000/data-sets/', {
        headers: {
          'X-AccessToken': tokenRandom
        }
      }).then((response) => {
        console.log(response.data.results)
      })
}

const createDatasetTest = async() => {
    titleRandom=generateTitle()
    dataTypeRandom='randomDataType'
    descriptionRandom = 'randomDesc'

    await axios.post(
        'http://localhost:4000/data-sets/',
        {
          title: titleRandom,
          data_type: dataTypeRandom,
          description: descriptionRandom
        },
        {
          headers: {
            'X-AccessToken': tokenRandom
          }
        }
      )
        .then((response) => {
          console.log('success')
        })
        .catch(function (error) {
          console.log(error.response.data.error.details[0].message)
        })
}
const updateDataSetTest = async() => {
  await axios.put(
    `http://localhost:4000/data-sets/${this.app.id}`,
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
  ).then((response) => {
    swal({
      title: 'Message',
      text: response.data.message,
      icon: 'success'
    }).then((result) => {
      this.$router.push('/api-dashboard-vmc')
    })
  })
}

(async function test() {
    axiosControl()
    for(var i=0;i<10;i++){
        await signUpTest()
        await loginTest()

        /*for(var j=0;j<10;i++){
            await profileViewTest()
            await changeUserNameTest()
            await changePasswordTest()
            await getDataSetsTest()
            await createDatasetTest()
            await updateDataSetTest()
        }*/
    }
    console.log(`Success: ${signUpSuccess} Fail: ${signUpFailed} All requests: ${signUpSuccess+signUpFailed}`)
})()
