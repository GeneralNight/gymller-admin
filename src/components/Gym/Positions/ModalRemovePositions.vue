<template>
<b-modal id="modalRemovePositions" title="Remover nível de acesso" hide-footer no-close-on-backdrop no-close-on-esc>
    <p class="modalText mb-0">
        Você está prestes a remover o nível de acesso <span>{{position ? position.name : ""}}</span>, tem certeza disso?
    </p>
    <div class="d-flex justify-content-end align-items-center mt-5">
        <button class="bCancel btn btn-secondary" @click.prevent="closeModal('modalRemovePositions')">Cancelar</button>
        <button class="bCancel btn btn-danger ml-3" @click.prevent="removePositions()"><i class="fas fa-trash-alt mr-2"></i>Remover</button>
    </div>
</b-modal>  
</template>
<script>

export default {
name: 'ModalRemovePositions',
props: ['slug','position','someDelete'],
methods: {
    async removePositions() {
        this.$api.deleteGymPositions(this.slug,this.position.id).then(res=> {
            if(res.data.msg == 'success') {
                this.$emit("update:someDelete",!this.someDelete)
                this.closeModal("modalRemovePositions")
            }else {
                var resCode = res.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('warning','Nenhum nível de acesso com este nome, talvez ele já tenha sido excluído!')
                    break;
                    case '003': 
                        this.makeToast('danger','Existem funcionários com este nível de acesso, desvincule todos que o possuem e depois volte aqui!')
                    break;
                    default:
                        this.makeToast('danger','Não foi possível remover o nível de acesso, tente novamente mais tarde!')
                    break;
                }
            }
        })
    }
}
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