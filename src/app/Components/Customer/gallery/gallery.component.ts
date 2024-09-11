import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
 
@Component({
  selector: 'app-gallery',
  standalone:true,
  imports:[FormsModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
onLeave(_t6: number) {
// throw new Error('Method not implemented.');
}
onHover(_t6: number) {
// throw new Error('Method not implemented.');
}
  images: string[] = [];
  cardStyles: any[] = [];
 
  ngOnInit(): void {
    // Define your pet images
    this.images = [
      'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/383557/pexels-photo-383557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/17968140/pexels-photo-17968140/free-photo-of-cow-standing-on-a-hillside-pasture.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/27109091/pexels-photo-27109091/free-photo-of-a-dog-standing-in-a-garden.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/16614544/pexels-photo-16614544/free-photo-of-cat-sleeping-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/20924499/pexels-photo-20924499/free-photo-of-an-orange-and-white-cat-curled-up-in-a-laundry-basket.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/10330689/pexels-photo-10330689.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/18878262/pexels-photo-18878262/free-photo-of-a-cat-sitting-on-a-pavement-next-to-a-cart-with-crisps-outside-of-the-shop.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2062316/pexels-photo-2062316.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5177537/pexels-photo-5177537.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/789468/pexels-photo-789468.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4383761/pexels-photo-4383761.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2289387/pexels-photo-2289387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3399700/pexels-photo-3399700.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3475680/pexels-photo-3475680.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6106518/pexels-photo-6106518.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/16261604/pexels-photo-16261604/free-photo-of-susses-lamm-auf-der-weide.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
   
    this.setRandomCardStyles();
  }
 
  // Generate random styles for each card
  setRandomCardStyles(): void {
    for (let i = 0; i < this.images.length; i++) {
      const width = Math.random() * 200 + 150; // Random width between 150px and 350px
      const height = Math.random() * 200 + 150; // Random height between 150px and 350px
 
      this.cardStyles.push({
        width: `${width}px`,
        height: `${height}px`
      });
    }
  }
}