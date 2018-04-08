import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DealEvent } from '../../models/event';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { BusinessUserPage } from '../business-user/business-user';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddDealEventPage {

  private categories: string[] = ['Food and Beverage', 'Retailer'];
  private dealEvent: DealEvent = {} as DealEvent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public toastController: ToastController,
              public eventService: EventServiceProvider) {
    this.dealEvent.category = this.categories[0];
    this.dealEvent.ownerId = this.userService.getCurrentUserId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  validate() {

    return (this.dealEvent.category) &&
           (this.dealEvent.title) &&
           (this.dealEvent.description) &&
           (this.dealEvent.startTime != null) &&
           (this.dealEvent.endTime != null) &&
           (this.dealEvent.postalCode);
  }

  create() {

    if(this.dealEvent.endTime <= this.dealEvent.startTime){
      this.toastController.create({
        message: "End time cannot be earlier or equal than start time!",
        duration: 3000,
        position: 'top'
      }).present();

      return;
    }

    try{
      this.eventService.addEvent(this.dealEvent);

      this.toastController.create({
        message: "Event added successfully!",
        duration: 3000,
        position: 'top'
      }).present();

      this.navCtrl.push(BusinessUserPage);

    }catch(error){
      this.toastController.create({
        message: error,
        duration: 3000,
        position: 'top'
      }).present();
    }
    
  }

}
