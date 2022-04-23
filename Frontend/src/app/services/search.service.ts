import store from '../redux/store';
import { SearchActionType } from './../redux/search-state';
 class SearchService {
     
    public setSearchText(searchText :string){
        store.dispatch({ type: SearchActionType.SearchTextCreated, payload: searchText });
    }

    public search(value: any, args: any, type: string = 'full'): string {
        if (!args) return value;
        if (type === 'full') {
            const re = new RegExp("\\b(" + args + "\\b)", 'igm');
            value = value.replace(re, '<span class="highlighted-text">$1</span>');
        }
        else {
            const re = new RegExp(args, 'igm');
            value = value.replace(re, '<span class="highlighted-text">$&</span>');
        }
        return value;
    }
}

const searchService = new SearchService();
export {searchService}