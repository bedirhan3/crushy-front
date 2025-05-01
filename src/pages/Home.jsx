import React from 'react'
import "../App.css"
import axios from 'axios'

function Home() {
    return (


        <div>
            <div className="home-crushy">
                <div className="floating-shapes">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div id="hearts-container"></div>

                <div className="container">
                    <div className="logo">Crushy</div>
                    <h1>Çok Yakında Sizlerleyiz!</h1>
                    <p>Yepyeni bir flört deneyimi için hazırlanıyoruz. Gerçek bağlantılar kurmak ve anlamlı ilişkiler oluşturmak için tasarlanmış, benzersiz bir platform. Şu anda son rötuşları yapıyoruz, çok yakında sizlerle olacağız!</p>

                    <div className="countdown">
                        <div><span id="days">00</span>Gün</div>
                        <div><span id="hours">00</span>Saat</div>
                        <div><span id="minutes">00</span>Dakika</div>
                        <div><span id="seconds">00</span>Saniye</div>
                    </div>

                    <div className="email-form">
                        <input type="email" placeholder="E-posta adresiniz" />
                        <button>Beni Haberdar Et</button>
                    </div>

                    <div className="social-icons">
                        <a href="#"><i>f</i></a>
                        <a href="#"><i>t</i></a>
                        <a href="#"><i>in</i></a>
                        <a href="#"><i>ig</i></a>
                    </div>

                    <div className="contact-info">
                        ✉️ <a href="mailto:hello@crushyapp.com">hello@crushyapp.com</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home