<template>
  <div class="userContainer">
    <!-- 登录 -->
    <div class="form form--login" :class="{ 'show-register': flag }">
      <h1 class="form__title">登录</h1>
      <div class="other">
        <!--<div class="social-container">-->
          <!--<a href="#" class="social"><i class="fab fa-qq"></i></a>-->
          <!--<a href="#" class="social"><i class="fab fa-weixin"></i></a>-->
          <!--<a href="#" class="social"><i class="fab fa-weibo"></i></a>-->
        <!--</div>-->
      </div>
      <span class="form__tip">选择以上方式登录或使用您的账号</span>
      <input class="form__input" type="text" placeholder="邮箱 / 用户名">
      <input class="form__input" type="password" placeholder="密码">
      <span class="form__tip forgotPsw">忘记密码?</span>
      <button class="btn form__submit" @click="handleLogin">登录</button>
    </div>

    <!-- 注册 -->
    <div class="form form--register" :class="{ 'show-register': flag }">
      <h1 class="form__title">注册</h1>
      <!--<div class="other social-container">-->
        <!--<a href="#" class="social"><i class="fab fa-qq"></i></a>-->
        <!--<a href="#" class="social"><i class="fab fa-weixin"></i></a>-->
        <!--<a href="#" class="social"><i class="fab fa-weibo"></i></a>-->
      <!--</div>-->
      <span class="form__tip">选择以上方式注册或使用您的账号</span>
      <input class="form__input" type="text" placeholder="用户名">
      <input class="form__input" type="text" placeholder="邮箱">
      <input class="form__input" type="password" placeholder="密码">
      <button class="btn form__submit" @click="handleRegister">注册</button>
    </div>

    <!-- 遮罩蒙版 -->
    <div class="mask" :class="{ 'mask--register': flag }">
      <div class="mask__inner">
        <div class="mask__panel mask__panel--left">
          <h1>已有账号?</h1>
          <p class="mask__split">请使用您的账号进行登录</p>
          <button class="btn mask__btn"  @click="flag= false">登录</button>
        </div>
        <div class="mask__panel mask__panel--right">
          <h1>没有账号?</h1>
          <p class="mask__split">立即注册加入我们，和我们一起开始旅程吧。</p>
          <button class="btn mask__btn" @click="flag= true">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
    	return {
    		flag: false
      }
    },
    methods: {
	    handleRegister() {
        console.log(this.$api.loginRequest({}))
      },
	    handleLogin() {
		    console.log(this.$api)
      }
    }
  }
</script>


<style scoped lang="less">
  /*@import "https://cdn.bootcss.com/font-awesome/5.11.2/css/all.min.css";*/

  .userContainer {

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    user-select: none;

    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;

    button.btn {
      border-radius: 20px;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      transition: transform 80ms ease-in;
      cursor: pointer;
      outline: none;
      &:active {
        transform: scale(0.95);

      }
    }

    .form {
      position: absolute;
      width: 50%;
      height: 100%;
      padding: 0 30px;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.6s ease-in-out;
      background-color: #fff;

      &.show-register {
        transform: translateX(100%);

        &.form--register {
          opacity: 1;
          z-index: 3;
        }
      }

      &--login {
        z-index: 2;
        .forgotPsw {
          margin: 15px 0;
          font-size: 13px;
          cursor: pointer;
        }
      }

      &--register {
        transition: transform 0.8s ease-in-out;
        opacity: 0;
      }


      &__input {
        box-sizing: border-box;
        background: #eee;
        border: none;
        padding: 12px 15px;
        margin: 5px 0;
        width: 100%;
        font-size: 12px;
      }


      &__tip {
        margin: 0 15px;
        font-size: 12px;
      }

      .form__submit {
        border: 1px solid #ff4b2b;
        background: #ff4b2b;
      }


      .social-container {
        .social {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 10px 5px;
          height: 40px;
          width: 40px;
          border-radius: 50%;
          font-size: 14px;
          border: 1px solid #ddd;
        }
      }

    }

    .mask {
      /*position: relative;*/
      position: absolute;
      left: 50%;
      width: 50%;
      height: 100%;
      transition: transform 0.6s ease-in-out;
      overflow: hidden;

      z-index: 5;

      &--register {
        transform: translateX(-100%);
        .mask__inner {
          transition: transform 0.6s ease-in-out;
           transform: translateX(50%);
        }
        .mask__panel {
          &--left {
            transform: translateX(0%);
          }
          &--right {
            transform: translateX(20%);
          }
        }
      }

      &__inner {
        position: relative;
        left: -100%;
        /*transform: translateX(0);*/
        transition: transform 0.6s ease-in-out;
        width: 200%;
        height: 100%;
        background: #ff416c;
        background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0/cover;
        color: #fff;
      }

      &__panel {
        position: absolute;
        width: 50%;
        height: 100%;
        padding: 0 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform: translateX(-20%);
        transition: transform 0.6s ease-in-out;

        &--right {
          left: 50%;
          transform: translateX(0%);
        }

      }

      &__split {
        margin: 20px 0 25px;
        font-size: 12px;
      }
      &__btn {
        border: 1px solid #fff;
      }
    }
  }
</style>