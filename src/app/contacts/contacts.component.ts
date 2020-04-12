import { Component, OnInit } from '@angular/core';

import {ContactsService} from '../../services/contacts.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Contact} from '../../model/model.contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  pageContacts: any;

  motCle: string = '';

  cuurentPage: number = 0;

  size: number = 5;

  pages: Array<number>;

  constructor(public http: HttpClient, public contactService: ContactsService, public router: Router) { }

  ngOnInit() {
     // this.getAllcontact();
    // this.doSearch();
  }
  doSearch() {

    this.contactService.getContacts(this.motCle, this.size, this.cuurentPage)
      .subscribe(data => {
        this.pageContacts = data;
        this.pages = new Array(data.totalPages);
        console.warn(data);
      }, err => {
        console.log(err);
      });
  }

  /* getAllcontact() {
    this.contactService.getAllContacts().subscribe(
      data => {
        console.warn(data);
      }, err => {
        console.log(err);
      });
  } */

  chercher() {
    this.doSearch();
  }

  gotoPage(i: number) {

    this.cuurentPage = i;

    this.doSearch();

  }

  onEditContact(id: number) {
    this.router.navigate(['editContact', id]);
  }

  onDeleteContact(c: Contact) {
    const confirm = window.confirm('Est vous sûre de vouloir supprimer ?');
    if (confirm === true) {
      this.contactService.deleteContact(c.id)
        .subscribe(data => {
          this.pageContacts.content.splice(
            this.pageContacts.content.indexOf(c), 1
          );
        }, err => {
          console.log(err);
        });
    }
  }

}
