```
<Card
        title="Producto Premium"
        description="Este es un producto de alta calidad con características excepcionales. Perfecto para usuarios que buscan lo mejor en tecnología y diseño."
        imageSource={{ uri: "https://picsum.photos/400/200?random=1" }}
        buttons={[
          { title: "Guardar", onPress: handleSave, style: "success" },
          { title: "Cancelar", onPress: handleCancel, style: "secondary" },
          { title: "Eliminar", onPress: handleDelete, style: "danger" },
        ]}
      />

      {/* Card solo con título y botones */}
      <Card
        title="Configuración rápida"
        buttons={[
          { title: "Aplicar", onPress: handleSave, style: "primary" },
          { title: "Restablecer", onPress: handleCancel, style: "secondary" },
        ]}
      />

      {/* Card solo con imagen y descripción */}
      <Card
        description="Una hermosa vista de la naturaleza que inspira tranquilidad y paz interior."
        imageSource={{ uri: "https://picsum.photos/400/200?random=2" }}
      />

      {/* Card minimalista solo con título */}
      <Card
        title="Notificación importante"
        showShadow={false}
        cardStyle={{ backgroundColor: "#F8FAFC" }}
      />

      {/* Card con botón deshabilitado */}
      <Card
        title="Proceso en curso"
        description="Por favor espera mientras procesamos tu solicitud..."
        buttons={[
          {
            title: "Procesando...",
            onPress: () => {},
            style: "primary",
          },
          { title: "Cancelar", onPress: handleCancel, style: "secondary" },
        ]}
      />

      {/* Card personalizada con estilos custom */}
      <Card
        title="Oferta especial"
        description="¡No te pierdas esta increíble oportunidad!"
        buttons={[
          { title: "Ver oferta", onPress: handleSave, style: "success" },
        ]}
        cardStyle={{
          backgroundColor: "#FEF3C7",
          borderWidth: 2,
          borderColor: "#F59E0B",
        }}
        titleStyle={{ color: "#92400E" }}
        descriptionStyle={{ color: "#A16207" }}
        borderRadius={16}
      />

      {/* Card con children - contenido personalizado */}
      <Card
        title="Estadísticas"
        body={
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>150</Text>
              <Text>Likes</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>30</Text>
              <Text>Comentarios</Text>
            </View>
          </View>
        }
        buttons={[
          { title: "Ver detalles", style: "secondary", onPress: () => {} },
        ]}
      />

      {/* Card con children más complejo */}
      <Card
        title="Contenido personalizado"
        buttons={[{ title: "Aceptar", onPress: handleSave, style: "primary" }]}
      >
        <View
          style={{ padding: 10, backgroundColor: "#E0F2FE", borderRadius: 8 }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0369A1" }}>
            ¡Mensaje especial!
          </Text>
          <Text style={{ fontSize: 14, color: "#0284C7", marginTop: 5 }}>
            Este es un contenido completamente personalizado usando children.
          </Text>
        </View>
      </Card>

      {/* Card solo con children, sin título */}
      <Card
        buttons={[
          { title: "Continuar", onPress: handleSave, style: "success" },
          { title: "Saltar", onPress: handleCancel, style: "secondary" },
        ]}
      >
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>🎉</Text>
          <Text
            style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}
          >
            ¡Felicitaciones!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              textAlign: "center",
              marginTop: 5,
            }}
          >
            Has completado todos los pasos
          </Text>
        </View>
      </Card>
```
