import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDTO } from '../interfaces/booking.interface';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'https://database-ianpages-b90a5aac.koyeb.app/api/bookings';

  constructor(private http: HttpClient) {}

  createBookingAndRedirect(bookingDTO: BookingDTO) {
    console.log(bookingDTO);
    this.http.post<{ url: string }>(this.apiUrl + '/checkout', bookingDTO)
      .subscribe({
        next: (response) => {
          console.log(response);
          const checkoutUrl = response.url; // Accede a la URL correctamente
          window.location.href = checkoutUrl; // Redirige a Stripe
        },
        error: (err) => {
          console.error('Error creating booking', err);
          console.log(err);
          alert('Error al procesar la reserva');
        }
      });
  }
  getUserBookings(userId: number){
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}