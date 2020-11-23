(function($){
    $(document).ready((j)=>{
        j('button.addPost').attr('disabled', true)
        j('#addPost').keyup((event)=>{
            const value = $(event.target).val().trim()
            if(value.length > 5){
                j('button.addPost').attr('disabled', false)
                
            }else{
                j('button.addPost').attr('disabled', true)
            }
        })

        //submit any form
        j('#addPostForm').submit((event)=>{
            event.preventDefault()
            j.post('/api/posts', {
                content: $('textarea').val()
            }, success=>{
                console.log(success);
            })
        })
    })
})(jQuery)