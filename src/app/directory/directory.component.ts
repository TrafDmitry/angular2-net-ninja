import { Component, OnInit } from '@angular/core';
import {LoggingService} from "../logging.service";
import { FilterPipe } from '../filter.pipe';
import { DataService} from '../data.service';

declare var firebase: any;

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  name: string;
  belt: string;
  ninjas = [];
  constructor(private logger: LoggingService, private dataService: DataService) {}

  logIt() {
    this.logger.log();
  }

  fbGetData() {
    firebase.database().ref('/').on('child_added',
        (snapshot) => {this.ninjas.push(snapshot.val())}
    );
  }

  ngOnInit() {
    this.fbGetData();
  }

  fbPostData(name, belt){
    firebase.database().ref('/').push({name:name, belt: belt});
    this.name = '';
    this.belt = '';
  }

}
