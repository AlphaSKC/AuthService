import type IUser from "@/interfaces/IUser"
import router from "@/router"
import { ref, type Ref } from "vue"

const url = import.meta.env.VITE_API_URL || 'http://utcancun.a.pinggy.online/'

export default class UserService {
    private users: Ref<IUser[]>
    private user: Ref<IUser>

    constructor(){
        this.users = ref([])
        this.user = ref({}) as Ref<IUser>
    }

    getUsers(): Ref<IUser[]>{
        return this.users
    }
    getUser(): Ref<IUser>{
        return this.user
    }
    
    async fetchAllUsers(): Promise<void>{
        try{
            const json = await fetch(url+'Users',{
                headers:{
                    'ngrok-skip-browser-warning': '0'
                }
            })
            const response = await json.json()
            this.users.value = await response
        }
        catch(error){
            console.error(error)
        }
    }
    
    async fetchUser(email: string): Promise<void>{
        try{
            const json = await fetch(url+'user/?email='+email,{
                headers:{
                    'ngrok-skip-browser-warning': '0'
                }
            })
            const response = await json.json()
            this.user.value = await response
        }
        catch(error){
            console.error(error)
        }
    }

    async createUser(user: IUser): Promise<void>{
        try{
            const json = await fetch(url+'register', {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': '0'
                },
                body: JSON.stringify(user)
            })
            const response = await json.json()
            this.user.value = await response
        }
        catch(error){
            console.log('Error creating user')
        }
    }

    async login(keys: Object): Promise<boolean>{
        try{
            const requestBody = JSON.stringify(keys);
            console.log('Request Body:', requestBody);
            const json = await fetch(url+'login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json; charset=UTF-8',
                    'ngrok-skip-browser-warning': '0'
                },
                body:requestBody
            })
            const response = await json.json()
            console.log('Response:', response.token)
            if(response.token != null){
                localStorage.setItem('token', response.token)
                router.push({name: 'home'})
                return true
            }else{
                return false
            }
        }
        catch(error){
            console.log('Error login:', error)
            return false    
        }
    }

}