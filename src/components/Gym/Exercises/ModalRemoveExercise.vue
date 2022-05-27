<template>
  <b-modal id="modalRemoveExercises" title="Remover Exercício" hide-footer no-close-on-backdrop no-close-on-esc>
    <p class="modalText mb-0">
        Você está prestes a remover o exercício <span>{{exercise ? exercise.name : ""}}</span>, tem certeza disso?
    </p>
    <div class="d-flex justify-content-end align-items-center mt-5">
        <button class="bCancel btn btn-secondary" @click.prevent="closeModal('modalRemoveExercises')">Cancelar</button>
        <button class="bCancel btn btn-danger ml-3" @click.prevent="removeExercises()"><i class="fas fa-trash-alt mr-2"></i>Remover</button>
    </div>
</b-modal>  
</template>

<script>
export default {
name: 'ModalRemoveExercise',
props: ['slug','exercise','someDelete'],
methods :{
    removeExercises() {
        this.$api.deleteGymExercises(this.slug,this.exercise.id).then(res=> {
            if(res.data.msg == 'success') {
                this.$emit("update:someDelete",!this.someDelete)
                this.closeModal("modalRemoveExercises")
            }else {
                var resCode = res.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('warning','Nenhum exercício com este nome, talvez ele já tenha sido excluído!')
                    break;
                    case '003': 
                        this.makeToast('danger','Existem aparelhos e fichas de treino que dependem deste exercício, desvincule todos que o possuem e depois volte aqui!')
                    break;
                    default:
                        this.makeToast('danger','Não foi possível remover o exercício, tente novamente mais tarde!')
                    break;
                }
            }
        })
    }
}
}
</script>

<style lang="scss" scoped>

</style>