<template>
	<div class="signIn">
		<p class="loginP first">
			<input class="input" v-model="user" type="text" placeholder="用户名" />
		</p>
		<p class="loginP">
			<input class="input" v-model="password" type="password" placeholder="密码" />
		</p>
		
	</div>
</template>

<script>
</script>

<style lang="scss">
	.signIn{
		.bottomBar{
			width: 100%;
			
		}
	}
</style>
