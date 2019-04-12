<template>
  <div
    class="aboutus d-flex flex-column align-items-center justify-content-center"
    v-if="aboutus"
    v-on:click.self="toggleAboutUs"
  >
    <div class="aboutus__inner">
      <p class="aboutus__title">Welcome to Common Shortcuts!</p>
      <p class="aboutus__text">
        Common Shortcuts is a way to find and bookmark shortcuts you need so you no longer have to dig the web. It's made to
        save everyone's time when using softwares they interact with daily.
      </p>

      <p class="aboutus__headline">About Me</p>
      <p class="aboutus__text">
        My name is
        <a href="https://marcelchristianis.com" target="_blank">Marcel Christianis</a>, 23 years old, from Indonesia. I believe in the intersection of
        code, design, and business. Follow me on
        <a
          href="https://twitter.com/marcelc63"
          target="_blank"
        >twitter</a>
        :)
      </p>

      <p class="aboutus__headline">Credits</p>
      <p class="aboutus__text">
        Shortcuts sourced from Shortcuts World
        <a
          href="https://shortcutworld.com"
          target="_blank"
        >https://shortcutworld.com</a>
      </p>

      <!-- Begin Mailchimp Signup Form -->
      <div id="mc_embed_signup">
        <form
          action="https://3secondstolaunch.us8.list-manage.com/subscribe/post?u=71aeabbbfeb1fd15e178abbd4&amp;id=f8e8865b07"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate
        >
          <div id="mc_embed_signup_scroll">
            <p
              class="aboutus__headline aboutus__headline--center"
            >Get updates from me and Common Shortcuts</p>
            <div class="mc-field-group aboutus__input">
              <input
                placeholder="Email Address"
                type="email"
                value
                name="EMAIL"
                class="required email"
                id="mce-EMAIL"
              >
            </div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display:none"></div>
              <div class="response" id="mce-success-response" style="display:none"></div>
            </div>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input type="text" name="b_71aeabbbfeb1fd15e178abbd4_f8e8865b07" tabindex="-1" value>
            </div>

            <div class="clear">
              <input
                class="aboutus__submit"
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
              >
            </div>
          </div>
        </form>
      </div>

      <!--End mc_embed_signup-->
      <i class="fa fa-times-circle aboutus__close" @click="toggleAboutUs"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  props: {},
  computed: {
    aboutus: function() {
      return this.$store.state.aboutus;
    }
  },
  methods: {
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleAboutUs: function() {
      this.$store.dispatch("save", {
        key: "aboutus",
        data: !this.aboutus
      });
    }
  }
};
</script>

<style scoped lang="scss">
.aboutus {
  z-index: 2;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.aboutus__inner {
  max-width: 500px;
  background: #fafafa;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
  box-shadow: 0 0 15px 0 #d1d1d1;
  position: relative;
  cursor: default;
}
.aboutus__title {
  font-weight: 600;
  font-size: 18px;
}
.aboutus__headline {
  text-align: left;
  margin-bottom: 5px;
  font-weight: 600;
  opacity: 0.8;
  font-size: 14px;
}
.aboutus__headline--center {
  text-align: center;
}
.aboutus__text {
  text-align: justify;
  font-size: 14px;
  opacity: 0.8;
}
.aboutus__close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  opacity: 0.6;
}
.aboutus__input {
  text-align: left;
}
.aboutus__input input {
  width: 100%;
  padding: 0 10px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  margin-bottom: 5px;
  font-size: 14px;
}
.aboutus__submit {
  border: none;
  background: #3183ff;
  color: #fafafa;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}
.aboutus__submit:hover {
  opacity: 0.8;
}
</style>
