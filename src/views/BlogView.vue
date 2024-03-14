<script lang="ts" setup>
import type IUser from '@/interfaces/IUser';
import UserService from '@/services/UserService';
import { onMounted, type Ref } from 'vue';

const service = new UserService()
const users: Ref<IUser[]> = service.getUsers()

onMounted(async () => {
    await service.fetchAllUsers()
})
</script>

<template>
    <section>
        <ol class="list">
            <li v-for="(user, index) in users" :key="index">
                <RouterLink :to="{ name: 'user', params: { email: user.email } }">
                    {{ user.name }}
                </RouterLink>
            </li>
        </ol>
    </section>
</template>

<style scoped>
.list {
    counter-reset: li;
    list-style: none;
    font: 1.5rem 'trebuchet MS', 'lucida sans';
    padding: 0;
    margin-bottom: 4rem;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);

    & ol {
        margin: 0 0 0 2rem;
    }

    & li {
        position: relative;
        display: block;
        padding: .4rem .4rem .4rem 2rem;
        margin: 1rem 0;
        background: #ddd;
        color: #34495E;
        text-decoration: none;
        border-radius: .3rem;
        transition: all .3s ease-out;

        &:hover {
            background: #34495E;
        }

        &:hover:before {
            transform: rotate(360deg);
        }

        &:before {
            content: counter(li);
            counter-increment: li;
            position: absolute;
            left: -1.3rem;
            top: 50%;
            color: black;
            margin-top: -1.6rem;
            background: #41B883;
            height: 3rem;
            width: 3rem;
            line-height: 2.5rem;
            border: .3rem solid #fff;
            text-align: center;
            font-weight: bold;
            border-radius: 2rem;
            transition: all .3s ease-out;
        }
    }
}
</style>