import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class ButtonComponent {
  label = input<string>('Tlačítko'); 
  type = input<'primary' | 'secondary' | 'danger'>('primary');
  disabled = input<boolean>(false);

  btnClick = output();

  onClick(): void {
    if (!this.disabled()) {
      this.btnClick.emit();
    }
  }
}
