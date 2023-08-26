<template>
  <div class="login_body">
    <div class="login">
      <div class="login-left">
      </div>
      <div class="login-right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <div class="logo">
            <h3 class="title">中地基勘工程技术有限公司</h3>
          </div>
          <el-form-item prop="username">
            <el-input
              class="login-input"
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login-input"
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="code" class="login-code" v-if="captchaEnabled">
            <el-input
              class="login-input login-san"
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 63%"
              @keyup.enter.native="handleLogin"
            >
            </el-input>
            <div style="margin-left: 52px;">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
          </el-form-item>
          <el-form-item style="width: 100%; margin-bottom: 100px;">
            <el-button
             class="login-btn"
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div style="float: left" v-if="register">
              <router-link class="link-type" :to="'/website/Register'"
                >立即注册</router-link
              >
            </div>
            <el-checkbox
              v-model="loginForm.rememberMe"
              style="margin: 0px 0px 25px 0px; float: right"
              >记住密码</el-checkbox
            >
          </el-form-item>
        </el-form>
      </div>
      <!--  底部  -->
      <!-- <div class="el-register-footer">
        <span>Copyright © 2018-2023 Ying Hui.vip All Rights Reserved.</span>
      </div> -->
    </div>
    <main-footer />
  </div>
</template>

<script>
import { login, getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { setToken } from "@/common/js/auth";
import MainFooter from '@/pages/common/Footer'
export default {
  name: "Login",
  components: {
    MainFooter
  },
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 注册开关
      register: true,
      // 验证码开关
      captchaEnabled: true,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCookie();
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.data.img;
          this.loginForm.uuid = res.data.uuid;
          console.log(this.loginForm);
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          delete this.loginForm.rememberMe;
          login(
            this.loginForm.username,
            this.loginForm.password,
            this.loginForm.code,
            this.loginForm.uuid
          ).then((response) => {
            if (response.data.code != 200) {
              this.loading = false;
              this.$notify.error({
                title: "登录失败",
                message: response.data.msg,
              });
              if (this.captchaEnabled) {
                this.getCode();
              }
            } else {
              setToken(response.token);
              this.$router.push("/website/forumHome");
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login_body {
  height: 100%;
  width: 100%;
}
.login {
  display: flex;
}
.login-left {
  width: 50%;
  height: 1015px;
  background-size: cover;
  background-image: url('../../assets/images/login.png');
}

.login-left img {
  width: 100%;
  height: 100%;
}

.login-right {
  flex: 1;
  align-items: center;
}
.login-form {
  margin: 0 auto;
  margin-top: 309px;
  width: 360px;
}

.logo .title {
  font-size: 30px;
  color: rgba(5, 193, 211, 1);
}

.login-input {
  border-radius: 10px !important;
}

.login-input >>> .el-input__inner {
  background: rgba(225, 236, 240, 1) !important;
  border: 1px solid rgba(225, 236, 240, 1) !important;
}

.login-san {
  width: 200px;
}
.login-code >>> .el-form-item__content{
  display: flex;
}
.login-code-img {
  width: 108px;
}
.login-btn {
  opacity: 1;
  border-radius: 30px;
  background: rgba(29, 38, 58, 1);
  border-color: rgba(29, 38, 58, 1);
}

.link-type {
  font-weight: 400;
  color: rgba(37, 138, 255, 1);
}
</style>
