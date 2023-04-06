import Dexie, { type Table } from 'dexie'

export  interface Movies{
    id?:number;
    Poster:String;
    Title?:String;
    Year?:String;
    imdbID?:String;
    Type?:String;

}

export class MySubClassedDexie extends Dexie{

movies!:Table<Movies>;

constructor(){
    super("myMovieDatabase");
    this.version(4).stores({
        movies:'++id, Poster, Title, Year, imdbID, Type'
    })
}
}

export const db = new MySubClassedDexie();