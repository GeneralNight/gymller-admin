<template>
  <b-modal id="modalRemoveExerciseEquipaments" title="Remover Equipamento" hide-footer no-close-on-backdrop no-close-on-esc>
    <p class="modalText mb-0">
        Você está prestes a remover a conexão entre o aparelho <span>{{equipament ? equipament.name : ""}}</span> e o atual exercício, tem certeza disso?
    </p>
    <div class="d-flex justify-content-end align-items-center mt-5">
        <button class="bCancel btn btn-secondary" @click.prevent="closeModal('modalRemoveExerciseEquipaments')">Cancelar</button>
        <button class="bCancel btn btn-danger ml-3" @click.prevent="removeEquipaments()"><i class="fas fa-trash-alt mr-2"></i>Remover</button>
    </div>
</b-modal>  
</template>

<script>
export default {
name: 'ModalRemoveExerciseEquipaments',
props: ['slug','equipament','someDelete','exerciseid'],
methods :{
    removeEquipaments() {
        this.$api.deleteGymExerciseEquipaments(this.slug,this.exerciseid,this.equipament.id).then(res=> {
            if(res.data.msg == 'success') {
                this.$emit("update:someDelete",!this.someDelete)
                this.closeModal("modalRemoveExerciseEquipaments")
            }else {
                var resCode = res.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('warning','Nenhum equipamento vinculado com este nome, talvez ele já tenha sido excluído!')
                    break;
                    case '003': 
                        this.makeToast('danger','Existem fichas de treino que dependem desta conexão, desvincule todas que o possuem e depois volte aqui!')
                    break;
                    default:
                        this.makeToast('danger','Não foi possível remover o a conexão, tente novamente mais tarde!')
                    break;
                }
            }
        })
    }
}
}
</script>

<style>

</style>