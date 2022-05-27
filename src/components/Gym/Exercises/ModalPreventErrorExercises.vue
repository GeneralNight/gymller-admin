<template>
  <b-modal id="modalPreventErrorExercises" title="Aviso!" hide-footer no-close-on-backdrop no-close-on-esc>
    <p class="modalText mb-0">
        Você está prestes a <span>sair sem salvar</span> suas alterações, tem certeza disso?
    </p>
    <div class="d-flex justify-content-end align-items-center mt-5">
        <button class="bCancel btn btn-secondary" @click.prevent="closeModal('modalPreventErrorExercises')">Cancelar</button>
        <button class="bCancel btn btn-primary ml-3" @click.prevent="goTo(`${path}`)"><i class="fas fa-reply mr-2"></i>Sair</button>
    </div>
</b-modal>  
</template>

<script>
export default {
name: 'modalPreventErrorExercises',
props:["slug","path","origin"],
}
</script>

<style lang="scss" scoped>
.modalText {
    font-size: 1.5rem;
    span {
        color: #00ca8d;
        font-weight: 700;
    }
}
</style>