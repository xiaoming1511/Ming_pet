<template>
    <div>
        <div class="wave">
        </div>
        <div class="flex-c absolute right-5 top-3">
            <!-- 主题 -->
            <el-switch v-model="value1" />
            <!-- 国际化 -->
            <el-dropdown trigger="click">
                <GlobalizationIcon
                    class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="changeLang('zh')">简体中文</el-dropdown-item>
                        <el-dropdown-item @click="changeLang('en')">English</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
        <div class="login-container">
            <div class="login-box flex-ac px-8 rounded-3xl flex-col">
                <logo class="mt-5"></logo>
                <h2 class="outline-none text-white my-4">
                    Pet
                </h2>
                <div class="login-form text-black">
                    <el-form ref="ruleFormRef" :model="userInfo" :rules="rules" class="demo-ruleForm" status-icon>
                        <el-form-item prop="userName">
                            <el-input :placeholder="$t('login.userName')" v-model="userInfo.username" />
                        </el-form-item>
                        <el-form-item prop="passWord">
                            <el-input :placeholder="$t('login.password')" v-model="userInfo.password" show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button class="w-screen" type="primary" @click="login()">
                                {{ $t('login.login') }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GlobalizationIcon from "@/assets/icons/globalization.svg?component";
import logo from "@/assets/icons/block.svg?component";
import type { FormRules } from 'element-plus'
import { useUserStore } from '@/stores/modules/user';
import { useRouter } from 'vue-router';


const userStore = useUserStore();

const value1 = ref(true)
const { locale } = useI18n()
const router = useRouter();


// 更改语言
const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}

interface userInfo {
    username: string
    password: string
}

const userInfo = reactive<userInfo>({
    username: '',
    password: '',
})

const rules = reactive<FormRules<userInfo>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
    ],
})

const login = async () => {
    try {
        await userStore.login({ username: userInfo.username, password: userInfo.password });
        // 登录成功后的逻辑，比如跳转到主页
        router.push('/dashboard')
    } catch (error) {

    }
}

</script>

<style scoped lang="scss">
@import '@/style/login.css';

.block-col-2 .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

:deep(.el-form-item) {
    margin-bottom: 22px;
}

:deep(.el-input, .el-input__inner) {
    height: 40px;
}
</style>