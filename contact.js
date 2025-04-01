document.addEventListener('DOMContentLoaded', function() {
    // Date minimum = aujourd'hui
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Restrictions d'heures selon les horaires du restaurant
    const heureInput = document.getElementById('heure');
    heureInput.addEventListener('focus', function() {
        const selectedDate = new Date(dateInput.value);
        const day = selectedDate.getDay(); // 0 = dimanche, 1 = lundi, etc.
        
        if (day === 1) { // Lundi - fermé
            this.setCustomValidity("Nous sommes fermés le lundi. Veuillez sélectionner un autre jour.");
        } else {
            this.setCustomValidity("");
            this.setAttribute('min', '12:00');
            this.setAttribute('max', '22:00');
        }
    });
    
    // Validation du numéro de téléphone français
    const telephoneInput = document.getElementById('telephone');
    telephoneInput.addEventListener('input', function() {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        
        if (!phoneRegex.test(this.value)) {
            this.setCustomValidity("Veuillez entrer un numéro de téléphone français valide");
        } else {
            this.setCustomValidity("");
        }
    });
    
    // Formulaire de réservation
    document.getElementById('reservationForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire
        
        // Collecter les données du formulaire
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const date = document.getElementById('date').value;
        const heure = document.getElementById('heure').value;
        const personnes = document.getElementById('nombrePersonnes').value;
        const message = document.getElementById('message').value;
        
        // Formater la date pour l'afficher dans le message
        const dateObj = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateFormatee = dateObj.toLocaleDateString('fr-FR', options);
        
        // Simuler l'envoi des données à un serveur
        const loadingAnimation = `
            <div class="text-center mb-3">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Traitement en cours...</span>
                </div>
                <p class="mt-2">Traitement de votre réservation...</p>
            </div>
        `;
        
        // Afficher une animation de chargement
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Traitement...';
        
        // Simuler un délai de traitement
        setTimeout(() => {
            // Créer une boîte de dialogue Bootstrap pour confirmer la réservation
            const modalHTML = `
                <div class="modal fade" id="reservationModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title">Réservation confirmée</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Merci ${prenom} ${nom} pour votre réservation !</p>
                                <p>Nous vous attendons le <strong>${dateFormatee}</strong> à <strong>${heure}</strong> pour <strong>${personnes}</strong> ${personnes > 1 ? 'personnes' : 'personne'}.</p>
                                <p>Un email de confirmation a été envoyé à <strong>${email}</strong>.</p>
                                ${message ? `<p class="mt-3"><strong>Votre message :</strong> <br>${message}</p>` : ''}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Restaurer le bouton
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Ajouter la modal au DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Afficher la modal
            const modal = new bootstrap.Modal(document.getElementById('reservationModal'));
            modal.show();
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Supprimer la modal du DOM après fermeture
            document.getElementById('reservationModal').addEventListener('hidden.bs.modal', function () {
                this.remove();
            });
        }, 1500);
    });
});
