const header = `
    <nav>
          <ul class="header-left">
            <li><img class="logo" src="images/Logo.png" alt="logo" /></li>
            <li><a href="#" id="home">HOME</a></li>
            <li><a href="#" id="shop">SHOP</a></li>
            <li><a href="#" id="magazine class="gray-text">Magazine</a></li>
          </ul>
    </nav>
      
    <div>
        <ul class="header-right">
            <li>
              <img
                class="cart-button"
                src="images/cart_button.png"
                alt="cart logo"
              />
            </li>
            <li><a id="login" href="#">Login</a></li>
        </ul>
    </div>`;

const footer = `
<div class="footer-nav">
          <nav>
            <ul>
              <li>About Us</li>
              <li>How can we help</li>
              <li>Shop by room</li>
              <li>Shop by style</li>
            </ul>
          </nav>
        </div>

        <div class="footer-icons">
          <ul>
            <li class="social-media instagram">
              <a href="https://www.instagram.com/" target="_blank"
                ><img src="images/instagram(1).png" alt="instagram logo"
              /></a>
            </li>
            <li class="social-media facebook">
              <a href="https://www.facebook.com/" target="blank"
                ><img src="images/facebook_logo.png" alt="facebook logo"
              /></a>
            </li>
            <li class="social-media twitter">
              <a href="https://twitter.com/" target="_blank"
                ><img src="images/twitter.png" alt="twitter logo"
              /></a>
            </li>
          </ul>
</div>`;

document.querySelector("header").innerHTML = header;
document.querySelector("footer").innerHTML = footer;

const home = document.querySelector("#home");
const shop = document.querySelector("#shop");
