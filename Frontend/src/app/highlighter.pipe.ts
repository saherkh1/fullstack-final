// import { Pipe, PipeTransform } from '@angular/core';
// import { SearchService } from './services/search.service';

// @Pipe({
//   name: 'highlighter'
// })
// export class HighlighterPipe implements PipeTransform {
// constructor(private searchService: SearchService){
//     searchService.getResults$()
//     .subscribe(res){
//         this.results = res;
//      };
// }
//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// transform(value: any, args: any): unknown {
//     if(!args) return value;
//       const re = new RegExp("\\b("+args+"\\b)", 'igm');
//       value= value.replace(re, '<span class="highlighted-text">$&</span>');
//       return value;
//   }

// transform(value: any, args: any,type:string): unknown {
//     if(!args) return value;
//     if(type==='full'){
//       const re = new RegExp("\\b("+args+"\\b)", 'igm');
//       value= value.replace(re, '<span class="highlighted-text">$1</span>');
//     }
//     else{
//       const re = new RegExp(args, 'igm');
//       value= value.replace(re, '<span class="highlighted-text">$&</span>');
//     }

//       return value;
//   }
//   transform(value: any, args: any): unknown {
//     if(!args) return value;
//       const re = new RegExp("\\b("+args+"\\b)", 'igm');
//       value= value.replace(re, '<span class="highlighted-text">$1</span>');
//       return value;
//   }
// }
