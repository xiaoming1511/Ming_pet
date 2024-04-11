<template>
    <div>
        <div class="wave">
        </div>
        <div class="flex-c absolute right-5 top-3">
            <!-- 主题 -->
            <el-switch v-model="topic" />
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
            <div class="shell">
                <div class="container a-container" id="a-container">
                    <Transition name="slide-fade">
                        <n-form ref="SignUpformRef" :model="signUpFormValue" class="form text-left" id="a-form"
                            v-show="!switchShow" label-placement="left" label-width="auto" show-require-mark
                            require-mark-placement="left" :rules="sginUpRules">
                            <h2 class="form_title title">创建账号</h2>
                            <n-form-item path="username" label="用户名">
                                <n-input v-model:value="signUpFormValue.username" class="form_input"
                                    placeholder="请输入用户名" @keydown.enter.prevent />
                            </n-form-item>
                            <n-form-item path="nickname" label="昵称">
                                <n-input v-model:value="signUpFormValue.nickname" class="form_input" type="name"
                                    placeholder="请输入昵称" @keydown.enter.prevent />
                            </n-form-item>
                            <n-form-item path="password" label="密码">
                                <n-input v-model:value="signUpFormValue.password" class="form_input" type="password"
                                    placeholder="请输入密码" @keydown.enter.prevent />
                            </n-form-item>
                            <n-form-item path="reenteredPassword" label="确认密码">
                                <n-input v-model:value="signUpFormValue.reenteredPassword" class="form_input"
                                    type="password" placeholder="请再次输入密码" @keydown.enter.prevent />
                            </n-form-item>
                            <n-form-item path="role">
                                <n-radio-group v-model:value="signUpFormValue.role" name="role">
                                    <n-radio v-for="item in roles" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </n-radio>
                                </n-radio-group>
                            </n-form-item>

                            <n-button class="form_button button submit" type="success" @click="handleSignUp">
                                SIGN UP
                            </n-button>
                        </n-form>
                    </Transition>
                </div>

                <div class="container b-container" id="b-container">
                    <Transition name="slide-fade">
                        <n-form ref="LoginformRef" :model="LoginformValue" class="form text-left" id="b-form"
                            v-show="switchShow" :show-label="false" :rules="loginRules" @submit.prevent="login">
                            <h2 class="form_title title">登录</h2>
                            <n-form-item path="username">
                                <n-input v-model:value="LoginformValue.username" class="form_input" placeholder="请输入用户名"
                                    @keydown.enter.prevent @keyup.enter="login" />
                            </n-form-item>
                            <n-form-item path="password">
                                <n-input v-model:value="LoginformValue.password" class="form_input" type="password"
                                    placeholder="请输入密码" @keydown.enter.prevent @keyup.enter="login" />
                            </n-form-item>

                            <n-button class="form_button button submit" type="success" @click="login">
                                SIGN IN
                            </n-button>
                        </n-form>
                    </Transition>
                </div>

                <div class="switch" id="switch-cnt" @click="changeForm">
                    <div class="switch_container" id="switch-c1">
                        <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
                        <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                        <n-button class="switch_button button switch-btn" type="info">
                            SIGN IN
                        </n-button>
                    </div>

                    <div class="switch_container is-hidden" id="switch-c2">
                        <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
                        <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
                        <n-button class="switch_button button switch-btn" type="info">
                            SIGN UP
                        </n-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GlobalizationIcon from "@/assets/icons/globalization.svg?component";
import type { FormRules } from 'element-plus'
import { useUserStore } from '@/stores/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { resetAuthRouter } from '@/router';
import { use } from 'echarts';

const userStore = useUserStore();
const { locale } = useI18n()
const message = useMessage();
const router = useRouter();
const route = useRoute()

const topic = ref(true)
const switchShow = ref(true);
const switchCtn = ref<HTMLElement | null>(null);
const switchC1 = ref<HTMLElement | null>(null);
const switchC2 = ref<HTMLElement | null>(null);
const switchCircle = ref<NodeListOf<HTMLElement> | null>(null);
const aContainer = ref<HTMLElement | null>(null);
const bContainer = ref<HTMLElement | null>(null);
const LoginformRef = ref<FormInst | null>(null);
const SignUpformRef = ref<FormInst | null>(null);
const roles = [
    {
        value: "1",
        label: "Admin"
    },
    {
        value: '2',
        label: 'User'
    }
]
const sex = [
    {
        value: "男",
        label: "男"
    },
    {
        value: '女',
        label: '女'
    }
]
const LoginformValue = reactive<userInfo>({
    username: '',
    password: '',
})
const signUpFormValue = ref<FormInst | null>(
    {
        username: '',
        nickname: '',
        password: '',
        reenteredPassword: '',
        role: '',
    }
)

interface userInfo {
    username: string
    password: string
}

// 更改语言
const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}

const login = async () => {
    try {
        await userStore.login({ username: LoginformValue.username, password: LoginformValue.password });
        resetAuthRouter()
        // 登录成功后的逻辑，比如跳转到主页
        const redirect = route.query.redirect || '/home/dashboard'
        router.push(redirect)
    } catch (error) {
        console.log(error);
    }
}

const handleSignUp = async () => {
    const { reenteredPassword, ...data } = signUpFormValue.value;
    SignUpformRef.value?.validate(async (errors) => {
        if (!errors) {
            try {
                // 调用注册方法
                await userStore.register({ ...data, nickName: data.nickname });
                changeForm()
                Object.keys(signUpFormValue.value).forEach(key => {
                    signUpFormValue.value[key] = '';
                });
                message.success('注册成功');
            } catch (error) {
                console.error('注册失败:', error);
                message.error('注册过程中发生错误');
            }
        } else {
            console.log(errors)
            message.error('验证失败')
        }
    })
}

onMounted(() => {
    switchCtn.value = document.querySelector("#switch-cnt");
    switchC1.value = document.querySelector("#switch-c1");
    switchC2.value = document.querySelector("#switch-c2");
    switchCircle.value = document.querySelectorAll(".switch_circle");
    aContainer.value = document.querySelector("#a-container");
    bContainer.value = document.querySelector("#b-container");
});


const changeForm = () => {
    // 切换动画相关的类
    if (switchCtn.value) {
        switchCtn.value.classList.add("is-gx");
        setTimeout(() => {
            switchCtn.value?.classList.remove("is-gx");
        }, 1500);
        switchCtn.value.classList.toggle("is-txr");
    }

    // 切换登录和注册表单的显示
    switchCircle.value?.forEach((circle) => {
        circle.classList.toggle("is-txr");
    });

    // 切换 switchShow 的布尔值
    switchShow.value = !switchShow.value;

    // 切换显示和隐藏的类
    switchC1.value?.classList.toggle("is-hidden");
    switchC2.value?.classList.toggle("is-hidden");
    aContainer.value?.classList.toggle("is-txl");
    bContainer.value?.classList.toggle("is-txl");
    aContainer.value?.classList.toggle("is-z");
};

const loginRules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 20,
            message: '用户名长度应在 3 到 20 个字符之间',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ],
});

const sginUpRules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        },
        {
            validator: (rule: FormItemRule, value: string) => {
                // 使用正则表达式来验证用户名格式
                const regex = /^[a-zA-Z0-9_-]{4,16}$/;
                if (!regex.test(value)) {
                    return new Error('用户名必须是4到16位（字母，数字，下划线，减号）');
                }
                return true;
            },
            trigger: 'blur'
        }
    ],
    nickname: [
        {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        },
        {
            min: 8,
            message: '密码长度不能少于8个字符',
            trigger: 'blur'
        },
        {
            validator: (rule: FormItemRule, value: string) => {
                if (!value) {
                    return new Error('密码不能为空');
                } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                    return new Error('密码必须包含大小写字母和数字');
                }
                return true;
            },
            message: '密码必须包含大小写字母和数字',
            trigger: 'blur'
        }
    ],
    reenteredPassword: [
        {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
        },
        {
            validator: (rule: FormItemRule, value: string) => {
                if (value !== signUpFormValue.value.password) {
                    return new Error('两次输入的密码不一致');
                }
                return true;
            },
            message: '两次输入的密码不一致',
            trigger: 'blur'
        }
    ],
    role: [
        {
            required: true,
            message: '请选择用户角色',
            trigger: 'change'
        }
    ]
})
</script>

<style scoped lang="scss">
@import '@/style/login.css';

.block-col-2 .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

:deep(.n-input__input-el) {
    height: 100%;
}

:deep(.n-input-wrapper) {
    padding: 0 1.25rem;
}

:deep(.n-form-item-label) {
    height: 40px !important;
    margin: 4px 0;
}
</style>