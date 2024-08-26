<template>
  <div class="flex h-screen">
    <Card style="width: 30rem; overflow: hidden" class="m-auto p-9">
      <template #header>
        <div class="flex">
          <LogoGestor class="m-auto p-7" G="rgb(255,157,0)" ESTOR="rgb(0,0,0)" width="150" height="50" />
        </div>
      </template>
      <template #title>Bem vindo</template>
      <template #subtitle>Por favor coloque sua credencial abaixo</template>
      <template #content>
        <p class="m-0 my-4">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText placeholder="Usuário" />
          </InputGroup>
        </p>
        <p class="m-0 my-4">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Senha" />
          </InputGroup>
        </p>
      </template>
      <template #footer>
        <Button label="Logar" class="w-full" />
      </template>
    </Card>
  </div>
</template>

<script>
import LogoGestor from '@/components/logo/index.vue';
export default {
  name: 'Login',
  components: {
    LogoGestor
  }
}
</script>
