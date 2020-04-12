import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../model/model.contact';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  constructor(public http: HttpClient) {

  }

  /*conversion du fichier au format json: c'est un observable*/
  getContacts(motCle: string, size: number, page: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/chercherContacts?mc=' + motCle + '&size=' + size + '&page=' + page);
    // http://localhost:8080/chercherContacts?mc=S&size=2&page=0
  }

  getAllContacts(motCle: string, size: number, page: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/contacts');
  }

  getContact(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/contacts/' + id);
  }

  saveContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:8080/contacts', contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>('http://localhost:8080/contacts/' + contact.id, contact);
  }

  deleteContact(id: number): Observable<boolean> {
    return this.http.delete<boolean>('http://localhost:8080/contacts/' + id);
  }

}
