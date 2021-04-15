import { Observable, interval } from "rxjs";
import { filter, map, take } from "rxjs/operators";

let label = document.createElement("label");
label.innerHTML="Unesi broj:";
document.body.appendChild(label);

let textBox= document.createElement("input");
textBox.className="Podatak";
textBox.type="number";  
document.body.appendChild(textBox);

const dugme = document.createElement("button");
dugme.innerHTML="Salji";
document.body.appendChild(dugme);
dugme.onclick=(ev)=>{
            let val = document.querySelector(".podatak");
            Item(val);
            Counting(val);
        }

function Item(x: any){
    const val = x.value;
    var observable = Observable.create((observer:any) => {
        try {
            observer.next(val)
            observer.complete()
        } catch (err) {
            observer.error(err)
        }
    }).subscribe(
        (a:any) => addItem(a),
        (error:any) => addItem(error));
    
    setTimeout(() => {
        observable.unsubscribe();
    }, 5000);
}

function Counting(x: any) {
    interval(x).pipe(
        filter(x => x % (Math.floor(Math.random() * 10) + 1) === 0),
        map(x => x * 10),
        take(5)
    ).subscribe(x => console.log(x));
  }

function addItem(val:any) {
    let output = '';
    output += `<li>${val}</li>`;
    document.body.innerHTML = output;
}