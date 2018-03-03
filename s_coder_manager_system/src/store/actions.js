import axios from 'axios'
export default {
        login(context) {
          return axios({
            method: 'post',
            url: 'http://xyiscoding.top/studyapp/user/login',
            dataType: 'json',
            data: context.state.form1
          })
        }
}