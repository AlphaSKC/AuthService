<script setup lang="ts">
import router from '@/router';
import UserService from '@/services/UserService';
import { onMounted, ref, type ComputedRef, type Ref, computed } from 'vue';


const name: Ref<string> = ref('');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const confirmPassword: Ref<string> = ref('');
const errors: Ref<Array<{ field: string; message: string }>> = ref([]);

const service = new UserService();

const changeButtonState: ComputedRef<boolean> = computed(() => {
    return errors.value.length === 0;
});

const submit = async () => {
    clearErrors();
    const user = {
        name: name.value,
        email: email.value,
        password: password.value,
        group: 'IDYGS82'
    };
    await service.createUser(user);
    router.push('/home');
}

const validateForm = () => {
    clearErrors();
    if (name.value.trim() === '') {
        errors.value.push({ field: 'name', message: 'El nombre es requerido' });
    }

    if (email.value.trim() === '') {
        errors.value.push({ field: 'email', message: 'El correo es requerido' });
    }

    if (email.value !== '' && !/^\S+@\S+\.\S+$/.test(email.value)) {
        errors.value.push({ field: 'email', message: 'El correo no es válido' });
    }

    if (password.value.length < 6 || password.value.trim() === '') {
        errors.value.push({ field: 'password', message: 'La contraseña es requerida y debe tener al menos 6 caracteres' });
    }

    if (confirmPassword.value === '') {
        errors.value.push({ field: 'confirmPassword', message: 'La confirmación de contraseña es requerida' });
    }

    if (password.value !== confirmPassword.value) {
        errors.value.push({ field: 'confirmPassword', message: 'Las contraseñas no coinciden' });
    }

}

const clearErrors = () => {
    errors.value = [];

};

onMounted(() => {
    validateForm();
});

</script>

<template>
    <div class="container">
        <form class="form" @submit.prevent="submit()">
            <p class="title">Registro </p>
            <p class="message">Crear un nuevo usuario</p>
            <label>
                <input class="input" type="text" @input="validateForm()" v-model="name">
                <span>Nombre</span>
            </label>
            <span v-if="errors.some(error => error.field === 'name')" class="error">
                {{ errors.find(error => error.field === 'name')?.message }}
            </span>
            <label>
                <input class="input" type="email" @input="validateForm()" v-model="email">
                <span>Correo</span>
            </label>
            <span v-if="errors.some(error => error.field === 'email')" class="error">
                {{ errors.find(error => error.field === 'email')?.message }}
            </span>
            <label>
                <input class="input" type="password" @input="validateForm()" v-model="password">
                <span>Contraseña</span>
            </label>
            <span v-if="errors.some(error => error.field === 'password')" class="error">
                {{ errors.find(error => error.field === 'password')?.message }}
            </span>
            <label>
                <input class="input" type="password" @input="validateForm()" v-model="confirmPassword">
                <span>Confirmación de contraseña</span>
            </label>
            <span v-if="errors.some(error => error.field === 'confirmPassword')" class="error">
                {{ errors.find(error => error.field === 'confirmPassword')?.message }}
            </span>
            <button class="submit" :disabled="!changeButtonState">Crear</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: fit-content;
    padding: 1.2rem;
    border-radius: 1.2rem;
    position: relative;
    background-color: #1a1a1a;
    box-shadow: 0px 15px 60px #00FF7F;
    color: #fff;
    border: 1px solid #333;

    & label {
        position: relative;
        font-size: 1rem;

        & .input {
            background-color: #333;
            color: #fff;
            width: 100%;
            padding: 20px 05px 05px 10px;
            outline: 0;
            border: 1px solid rgba(105, 105, 105, 0.397);
            border-radius: 10px;
        }

        & .input+span {
            color: rgba(255, 0, 0, 0.692);
            font-weight: bold;
            position: absolute;
            left: 10px;
            top: 0px;
            font-size: 0.9em;
            cursor: text;
            transition: 0.3s ease;
        }

        & .input:placeholder-shown+span {
            top: 12.5px;
            font-size: 0.9em;
        }

        & .input:focus+span,
        .input:valid+span {
            color: #41B883;
            top: 0px;
            font-size: 0.7em;
            font-weight: 600;
        }
    }
}

.title {
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #41B883;

    &::before {
        width: 1rem;
        height: 1rem;
    }

    &::after {
        width: 1rem;
        height: 1rem;
        animation: pulse 1s linear infinite;
    }

    &::before,
    &::after {
        position: absolute;
        content: "";
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        left: 0px;
        background-color: #41B883;
    }
}

.message {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
}

.input {
    font-size: 1.3rem;
}

.submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    background-color: #41B883;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:enabled {
        background-color: #41b88385;
    }
}

.error {
    color: white;
    font-size: 1.1rem;
    background-color: #da3737;
    padding: 5px;
    border: 2px solid black;
    border-radius: 5px;
    display: block;
    margin-top: 5px;
}

@keyframes pulse {
    from {
        transform: scale(0.9);
        opacity: 1;
    }

    to {
        transform: scale(1.8);
        opacity: 0;
    }
}
</style>