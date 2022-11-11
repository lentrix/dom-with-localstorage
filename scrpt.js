var items = [] 

const render = () =>{
    const tbody = $("#items")

    tbody.empty()

    items.forEach((item, index)=>{
        const tr = $(document.createElement("tr"))
        const td1 = $(document.createElement("td"))
        td1.text(item.description)

        const td2 = $(document.createElement("td"))
        td2.addClass('text-end')
        td2.text(item.price.toFixed(2))

        const td3 = $(document.createElement("td"))
        td3.addClass('text-center')
        td3.text(item.quantity)

        const amount = item.quantity*item.price

        const td4 = $(document.createElement("td"))
        td4.addClass('text-end')
        td4.text(amount.toFixed(2))

        const btn = $(document.createElement("button"))
        btn.addClass('btn').addClass('btn-danger')
            .addClass('btn-sm').addClass('delete-btn')
            .data('index', index).text("X")
        
        
        const td5 = $(document.createElement("td"))
        td5.addClass('text-center')
        td5.append(btn)

        tr.append(td1).append(td2).append(td3).append(td4).append(td5)

        tbody.append(tr)
    })
}

$(document).ready(()=>{

    items = JSON.parse(window.localStorage.getItem("items"))
    render()
    
    $("#add-item").click(()=>{
        const des = $("#description")
        const prc = $("#price")
        const qty = $("#quantity")

        const item = {
            "description": des.val(),
            "price": prc.val()*1,
            "quantity": qty.val()*1
        }

        items.push(item)

        render()

        des.val(null)
        prc.val(null)
        qty.val(null)
        des.focus()

    })

    $(document).on('click','.delete-btn', (ev)=>{
        const btn = $(ev.target)

        const index = btn.data('index')

        items.splice(index, 1)

        render()
    })

    $("#save").click(()=>{
        //save the items array into local storage -- items
        window.localStorage.setItem("items",JSON.stringify(items))
    })



})