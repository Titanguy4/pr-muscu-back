import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class CreateAdminUserSeeder extends BaseSeeder {
  async run() {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findBy('email', 'admin@prmuscu.com')

    if (!existingUser) {
      await User.create({
        email: 'admin@prmuscu.com',
        password: 'Admin123!', // À changer en production
        fullName: 'Administrateur',
        isAdmin: true,
      })

      console.log('Utilisateur admin créé avec succès')
    } else {
      console.log("L'utilisateur admin existe déjà")

      // S'assurer que l'utilisateur est bien administrateur
      if (!existingUser.isAdmin) {
        existingUser.isAdmin = true
        await existingUser.save()
        console.log("Utilisateur mis à jour en tant qu'admin")
      }
    }
  }
}
