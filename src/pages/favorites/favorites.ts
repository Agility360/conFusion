import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, ItemSliding, ToastController, LoadingController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite';
import { Dish } from '../../shared/dish';


/**
 * Generated class for the Favorites page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Favorites');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);

    let loading = this.loadingCtrl.create({
      content: 'Deleting ...'
    });

    let toast = this.toastCtrl.create({
      message: 'Dish deleted.',
      duration: 2000
    });

    loading.present();

    this.favoriteservice.deleteFavorite(id)
      .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present();},
        errmess => {this.errMess = errmess; loading.dismiss(); });


    // closes SlidingItem buttons
    item.close();
  }

}
