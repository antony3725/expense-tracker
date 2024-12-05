<template>
    <!-- <template> -->
    <div class="login-container">

        <h1 class="project-title">
            <span class="brier">B R I E R</span>
            <span class="subtitle">Expense Tracker</span>
        </h1>

        <!-- Add preview images containers -->
        <div class="preview-container">
            <div class="preview-left">
                <img src="../../assets/mobile-preview.jpg" alt="Mobile View" class="mobile-preview" />
            </div>
            <div class="preview-right">
                <img src="../../assets/desktop-preview.jpg" alt="Desktop View" class="desktop-preview" />
            </div>
        </div>

        <div class="login-box">
            <div class="login-header">
                <!-- <img src="@/assets/logo.png" alt="Logo" class="logo" /> -->
                <!-- <img src="../../assets/fourth.jpg" alt="Logo" class="logo" /> -->
                <!-- <img src="../../assets/calculate.png" alt="Logo" class="logo" /> -->

                <!-- <h2>Login to Expense Tracker</h2> -->
            </div>
            <form @submit.prevent="onLogin">
                <div class="input-field">
                    <InputText v-model="ObjLogin.email" type="email" id="email" placeholder="Username or email" required
                        class="input" />
                </div>

                <div class="input-field">
                    <Password v-model="ObjLogin.password" id="password" placeholder="Password" :feedback="false"
                        required toggleMask class="input" />
                    <small v-if="passwordError" class="warning">{{ passwordError }}</small>
                </div>

                <Button :label="loading ? 'Logging in...' : 'Login'" :disabled="loading" type="submit"
                    class="login-button">
                    <template v-if="loading">
                        <i class="pi pi-spin pi-spinner"></i>
                    </template>
                </Button>

                <div class="login-links">
                    <a @click="navigateToForgotPassword" class="forgot-password-link">Forgot Password?</a>
                    <span class="divider">|</span>
                    <a @click="navigateToSignUp" class="sign-up-link">Sign Up</a>
                </div>

                <div class="social-login">
                    <Button label="Login with Google" icon="pi pi-google" class="google-button"
                        @click="loginWithGoogle" />
                </div>
            </form>
        </div>
    </div>

    <div>
        <Toast ref="toast" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from '../../components/InputText.vue';
import Password from '../../components/Password.vue';
import Button from '../../components/Button.vue';
import authenticationservice from '../../services/authenticationservice';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
    components: {
        InputText,
        Password,
        Button,
        Toast,
    },
    props: {
        trigger: {
            readonly: false,
            type: Boolean,
            default: ref(false),
        },
    },
    setup() {
        const toast = useToast();
        const loading = ref(false);
        const passwordError = ref('');

        const ObjLogin = ref({
            email: "",
            password: "",
        });

        const validatePassword = (password: string) => {
            const errors = [];
            if (password.length < 6) {
                errors.push('at least 6 characters');
            }
            if (!/[a-z]/.test(password)) {
                errors.push('one lowercase letter');
            }
            if (!/[A-Z]/.test(password)) {
                errors.push('one uppercase letter');
            }
            if (!/\d/.test(password)) {
                errors.push('one number');
            }
            if (!/\W/.test(password)) {
                errors.push('one special character');
            }

            if (errors.length > 0) {
                passwordError.value = `Password must contain ${errors.join(', ')}.`;
                return false;
            }
            passwordError.value = '';
            return true;
        };

        const onLogin = async () => {
            debugger;
            if (!validatePassword(ObjLogin.value.password)) {
                return;
            }
            loading.value = true;
            try {
                const response = await authenticationservice.Login(
                    ObjLogin.value.email, ObjLogin.value.password
                );

                if (response.data.result) {
                    let UsersData = {
                        UserId: response.data.result.Id,
                    };

                    localStorage.setItem("UsersData", JSON.stringify(UsersData));
                    toast.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome back!', life: 3000 });
                }
                else {
                    toast.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid Username or Password', life: 3000 });
                }
            }
            catch (error) {
                console.error(error);
                toast.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try again later.', life: 3000 });
            }
            finally {
                loading.value = false;
            }
        };

        const navigateToForgotPassword = () => {
            // Navigate to forgot password page
        };

        const navigateToSignUp = () => {
            // Navigate to sign up page
        };

        const loginWithGoogle = () => {
            // Implement Google login
        };

        return {
            ObjLogin,
            onLogin,
            loading,
            passwordError,
            navigateToForgotPassword,
            navigateToSignUp,
            loginWithGoogle,
        };
    },
});
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #a5c0ea, #c7d5e3);
    position: relative;
}

.login-container::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image:
        radial-gradient(#5B86E5 0.5px, transparent 0.5px),
        radial-gradient(#36D1DC 0.5px, transparent 0.5px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    opacity: 0.03;
    pointer-events: none;
}

.project-title {
    position: absolute;
    top: 0px;
    text-align: center;
    font-family: 'Righteous', cursive;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.brier {
    display: block;
    font-size: 1.2em;
    background: linear-gradient(135deg, #36D1DC, #5B86E5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
    letter-spacing: 8px;
    font-weight: 700;
    /* Make text bolder */
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
    /* Add depth */
}


.subtitle {
    display: block;
    font-size: 1.5em;
    background: linear-gradient(135deg, #36D1DC, #5B86E5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
    font-weight: 600;
    /* Make text bolder */
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
    /* Add depth */
}

.login-box {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: #fff;
    background: linear-gradient(135deg, #b7d3f0, #ededee);
  
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 1;
    
}

.login-header {
    margin-bottom: 20px;
}

.logo {
    width: 150px;
    margin-bottom: 20px;
}

.input-field {
    margin-bottom: 1rem;
    text-align: left;
    /* Align labels to the left */
}

.input-field label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.input {
    width: 100%;
    padding: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
}

.login-button {
width: 100%;
    margin-bottom: 1rem;
}

.login-links {
display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.social-login {
    display: flex;
    justify-content: center;
}

.google-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #757575;
    border: 1px solid #dcdcdc;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
}

.google-button:hover {
    background-color: #f5f5f5;
}

.google-logo {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.forgot-password-link,
.sign-up-link {
    color: #3897f0;
    cursor: pointer;
}

.divider {
    margin: 0 10px;
    color: #999;
}

.preview-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.preview-left {
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    animation: float 2s ease-in-out infinite;
}

.preview-right {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    animation: float 2s ease-in-out infinite;
    animation-delay: 1s;
}

.mobile-preview,
.desktop-preview {
    max-height: 300px;
    /* Adjusted height to create more space */
    width: auto;
    opacity: 0.5;
    /* Reduced opacity to make background more visible */
    filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.1));
}

@keyframes float {
    0% {
        transform: translateY(-50%) translateX(0);
    }

    50% {
        transform: translateY(-50%) translateX(-10px);
    }

    100% {
        transform: translateY(-50%) translateX(0);
    }
}

/* Media query for smaller screens */
@media (max-width: 1200px) {
    .preview-container {
        display: none;
    }
}

@media (max-width: 768px) {

    .mobile-preview,
    .desktop-preview {
        max-height: 200px;
        /* Further adjust for smaller screens */
    }
}

.warning {
    color: orange;
    /* or any other warning color you prefer */
}
</style>