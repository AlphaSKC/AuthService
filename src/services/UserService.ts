import type IUser from "@/interfaces/IUser"
import { ref, type Ref } from "vue"

const url = import.meta.env.VITE_API_URL || 'https://2d55-201-134-180-250.ngrok-free.app/'

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
                    'ngrok-skip-browser-warning': '0',
                    'Content-Type': 'application/json; charset=UTF-8'
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

    async login(keys: Object): Promise<void>{
        try{
            const json = await fetch(url+'login',{
                method: 'POST',
                headers:{
                    'ngrok-skip-browser-warning': '0'
                },
                body:JSON.stringify(keys)
            })
            const response = await json.json()
            console.log(response)
        }
        catch(error){
            console.log('Error login')    
        }
    }

}